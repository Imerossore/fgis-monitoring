"use client";

import { useState, useEffect, useActionState } from "react";
import { ActionState, UserType } from "@/lib/getAuthUser";
import toast from "react-hot-toast";
import { parseISO, getMonth, getYear } from "date-fns";
import { useParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import { StatusHeader, sendSystemData } from "@/actions/system";

const types = [
  "Operational",
  "Non-Operational",
  "FUSA",
  "Newly Generated",
  "PNR",
  "Converted",
  "Service Area",
];

const initialstate: ActionState = {
  success: false,
  message: "",
  data: null,
};

type HeaderType = {
  type: string;
  actual?: number;
  target?: number;
  percentage: number;
  status: string;
};

export default function SystemDataComponent({
  data,
  user,
}: {
  data: StatusHeader[];
  user: UserType;
}) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { division, system } = useParams();

  const filteredData = data.filter((item) => {
    const itemDate = parseISO(item.created_at || "");
    return (
      getMonth(itemDate) + 1 === selectedMonth &&
      getYear(itemDate) === selectedYear &&
      item.system === system &&
      item.division === division
    );
  });

  const hasExistingData = (filteredData: StatusHeader[]) => {
    return (
      filteredData.length > 0 &&
      filteredData.some(
        (item) =>
          item.review_status === "completed" || item.review_status === "pending"
      )
    );
  };

  const [typeData, setTypeData] = useState<HeaderType[]>(
    types.map((type) => ({
      type,
      actual: [
        "Operational",
        "Non-Operational",
        "Newly Generated",
        "PNR",
        "Converted",
      ].includes(type)
        ? 0
        : undefined,
      target: [
        "Operational",
        "Non-Operational",
        "Newly Generated",
        "PNR",
        "Converted",
      ].includes(type)
        ? 0
        : undefined,
      percentage: 0,
      status: "",
    }))
  );
  useEffect(() => {
    setTypeData((prevTypeData) => {
      const updatedData = prevTypeData.map((num) => {
        let percentage = 0;

        if (num.actual !== undefined && num.target !== undefined) {
          percentage = num.actual !== 0 ? (num.target / num.actual) * 100 : 0;
        }

        return {
          ...num,
          percentage: Math.round(percentage),
          status:
            num.actual === 0 && num.target === 0
              ? ""
              : percentage >= 100
              ? "Completed"
              : "Ongoing",
        };
      });

      // Updating FUSA
      const operational =
        updatedData.find((d) => d.type === "Operational")?.percentage || 0;
      const nonOperational =
        updatedData.find((d) => d.type === "Non-Operational")?.percentage || 0;
      const fusaIndex = updatedData.findIndex((d) => d.type === "FUSA");
      if (fusaIndex !== -1) {
        updatedData[fusaIndex].percentage = Math.round(
          (operational + nonOperational) / 2
        );
        updatedData[fusaIndex].status =
          updatedData[fusaIndex].percentage === 0
            ? ""
            : updatedData[fusaIndex].percentage >= 100
            ? "Completed"
            : "Ongoing";
      }

      // Updating Service Area
      const fusa = updatedData.find((d) => d.type === "FUSA")?.percentage || 0;
      const newlyGenerated =
        updatedData.find((d) => d.type === "Newly Generated")?.percentage || 0;
      const pnr = updatedData.find((d) => d.type === "PNR")?.percentage || 0;
      const converted =
        updatedData.find((d) => d.type === "Converted")?.percentage || 0;
      const serviceAreaIndex = updatedData.findIndex(
        (d) => d.type === "Service Area"
      );
      if (serviceAreaIndex !== -1) {
        updatedData[serviceAreaIndex].percentage = Math.round(
          (fusa + newlyGenerated + pnr + converted) / 4
        );
        updatedData[serviceAreaIndex].status =
          updatedData[serviceAreaIndex].percentage === 0
            ? ""
            : updatedData[serviceAreaIndex].percentage >= 100
            ? "Completed"
            : "Ongoing";
      }

      return updatedData;
    });
  }, [typeData.map((num) => `${num.actual}-${num.target}`).join(",")]);

  const handleInputChange = (
    index: number,
    field: "actual" | "target",
    value: string
  ) => {
    setTypeData((prevTypeData) => {
      const updatedTypeData = [...prevTypeData];
      updatedTypeData[index] = {
        ...updatedTypeData[index],
        [field]: parseFloat(value) || 0,
      };
      return updatedTypeData;
    });
  };
  const [state, action, isPending] = useActionState(
    sendSystemData,
    initialstate
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      setIsEditing(false);
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="text-slate-900 p-4 ">
      <form action={action}>
        <div className="flex gap-4 mb-6 items-center">
          <p className="text-muted-foreground">Filter Date:</p>
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value) => setSelectedMonth(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                {
                  length:
                    selectedYear === new Date().getFullYear()
                      ? new Date().getMonth() + 1
                      : 12,
                },
                (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {new Date(2000, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Select
            defaultValue={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => {
                const year = (new Date().getFullYear() - i).toString();
                return (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div>
            {isEditing ? (
              <div className="space-x-2">
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-500">
                  save
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                disabled={hasExistingData(filteredData)}
                onClick={() => setIsEditing(true)}
                className={`${
                  hasExistingData(filteredData)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary "
                } `}
              >
                {filteredData.length > 0
                  ? filteredData[0].review_status === "pending"
                    ? "Pending approval by admin"
                    : filteredData[0].review_status === "completed"
                    ? "Already completed"
                    : "Edit"
                  : "Edit"}
              </Button>
            )}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-5 gap-4 mb-2 font-semibold border bg-slate-200 p-2">
            <p>Type</p>
            <p>Actual</p>
            <p>Target</p>
            <p>Percentage</p>
            <p>Status</p>
          </div>
          {typeData.map((num, index) => (
            <div
              key={index}
              className={`grid grid-cols-5 gap-4 p-2 ${
                num.type === "FUSA" || num.type === "Service Area"
                  ? "bg-slate-100 "
                  : ""
              }`}
            >
              <p>{num.type}</p>
              {/* Hidden Input for type */}
              <Input type="hidden" name={`type_${index}`} value={num.type} />

              {/* Actual Input */}
              {num.actual !== undefined ? (
                <Input
                  type="text"
                  name={`actual_${index}`}
                  disabled={hasExistingData(filteredData) || !isEditing}
                  value={
                    filteredData[0]?.details.find((d) => d.type === num.type)
                      ?.actual ?? num.actual
                  }
                  onChange={(e) =>
                    handleInputChange(index, "actual", e.target.value)
                  }
                  className={`${
                    hasExistingData(filteredData) || !isEditing
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                />
              ) : (
                <span></span>
              )}

              {/* Target Input */}
              {num.target !== undefined ? (
                <Input
                  type="text"
                  name={`target_${index}`}
                  disabled={hasExistingData(filteredData) || !isEditing}
                  value={
                    filteredData[0]?.details.find((d) => d.type === num.type)
                      ?.target ?? num.target
                  }
                  onChange={(e) =>
                    handleInputChange(index, "target", e.target.value)
                  }
                  className={`${
                    hasExistingData(filteredData) || !isEditing
                      ? "cursor-not-allowed"
                      : ""
                  }`}
                />
              ) : (
                <span></span>
              )}
              <p>
                {filteredData[0]?.details.find((d) => d.type === num.type)
                  ?.percentage || num.percentage}
                %
              </p>
              {/* Hidden Input for percentage */}
              <Input
                type="hidden"
                name={`percentage_${index}`}
                value={num.percentage}
              />
              <div>
                <Badge
                  className={`${
                    filteredData[0]?.details.find((d) => d.type === num.type)
                      ?.status || num.status === "Completed"
                      ? "bg-green-500"
                      : filteredData[0]?.details.find(
                          (d) => d.type === num.type
                        )?.status || num.status === "Ongoing"
                      ? "bg-blue-400"
                      : ""
                  }`}
                >
                  {filteredData[0]?.details.find((d) => d.type === num.type)
                    ?.status || num.status}
                </Badge>
              </div>
              {/* Hidden Input for status */}
              <Input
                type="hidden"
                name={`status_${index}`}
                value={num.status}
              />
            </div>
          ))}
        </div>
        {/* Add system and division fields if needed */}
        <Input
          type="hidden"
          name="system"
          value={system} // Replace with actual system name
        />
        <Input
          type="hidden"
          name="division"
          value={division} // Replace with actual division name
        />
        <Input
          type="hidden"
          name="recorded_by"
          value={user?.id} // Replace with actual recorded_by name
        />
      </form>
    </div>
  );
}
