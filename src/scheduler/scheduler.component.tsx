import React, { useCallback, useState } from "react";
import Header from "../components/header/header.component";
import Illustration from "../facility-metrics/facility-metrics-illustration.component";
import fhirStyles from "../fhir/sync-fhir-profile/sync-fhir-profile.scss";
import DataList from "../components/data-table/data-table.component";
import {
  runTask,
  schedulerTableHeaders,
  useGetTasks,
} from "./scheduler.resource";
import { Button, InlineLoading } from "@carbon/react";
import { ChooseItem } from "@carbon/react/icons";
import { showNotification, showToast } from "@openmrs/esm-framework";

const ScheduleManager: React.FC = () => {
  const { tasks } = useGetTasks();
  const [executingTaskId, setExecutingTaskId] = useState(null);
  const isExecutingTask = (taskId: string) => executingTaskId === taskId;
  const getTasks = () => {
    const taskArray = [];
    tasks?.map((task) => {
      taskArray.push({
        ...task,
        actions: isExecutingTask(task.uuid) ? (
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

  const executeTask = useCallback((task: taskItem) => {
    setExecutingTaskId(task.uuid);

    runTask(task).then(
      (response) => {
        if (response?.status === 201) {
          showToast({
            critical: true,
            title: "Execution Successful",
            kind: "success",
            description: `Task ${task?.name} executed Successfully`,
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
        <DataList
          data={getTasks()}
          columns={schedulerTableHeaders}
          pageSize={20}
        />
      </div>
    </>
  );
};

export default ScheduleManager;
