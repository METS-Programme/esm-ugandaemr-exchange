import React, { useCallback, useState } from "react";
import Header from "../components/header/header.component";
import Illustration from "../facility-metrics/facility-metrics-illustration.component";
import fhirStyles from "../fhir/fhir.scss";
import DataList from "../components/data-table/data-table.component";
import {
  runTask,
  schedulerTableHeaders,
  schedulerTasks,
  Task,
} from "./scheduler.resource";
import { Button, InlineLoading } from "@carbon/react";
import { ChooseItem } from "@carbon/react/icons";
import { showNotification, showToast } from "@openmrs/esm-framework";

const ScheduleManager: React.FC = () => {
  const [executingTaskId, setExecutingTaskId] = useState(null);
  const isExecutingTask = (taskId: string) => executingTaskId === taskId;
  const getTasks = () => {
    const taskArray = [];
    schedulerTasks.map((task) => {
      taskArray.push({
        ...task,
        actions: isExecutingTask(task.no) ? (
          <InlineLoading />
        ) : (
          <Button
            type="button"
            size="sm"
            className="submitButton clear-padding-margin"
            iconDescription={"Execute Task"}
            kind="ghost"
            renderIcon={ChooseItem}
            hasIconOnly
            onClick={() => executeTask(task)}
          />
        ),
      });
    });

    return taskArray;
  };

  const executeTask = useCallback((task: Task) => {
    setExecutingTaskId(task.no);

    runTask(task).then(
      (response) => {
        if (response.status === 201) {
          showToast({
            critical: true,
            title: "Execution Successful",
            kind: "success",
            description: `Task ${task.name} executed Successfully`,
          });
        }
        setExecutingTaskId(null);
      },
      (error) => {
        showNotification({
          title: "Error executing task",
          kind: "error",
          critical: true,
          description: error?.message,
        });
        setExecutingTaskId(null);
      }
    );
  }, []);

  return (
    <>
      <Header illustrationComponent={<Illustration />} title={`Scheduler`} />

      <div className={fhirStyles.fhirContainer}>
        <DataList data={getTasks()} columns={schedulerTableHeaders} />
      </div>
    </>
  );
};

export default ScheduleManager;
