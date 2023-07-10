import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useIntl } from "react-intl";

import { Button } from "components/ui/Button";

import { useCurrentWorkspace } from "core/api";
import { FILE_TYPE_DOWNLOAD, downloadFile, fileizeString } from "core/utils/file";

import { CleanedLogLines } from "./useCleanLogs";

interface DownloadButtonProps {
  logLines: CleanedLogLines;
  fileName: string;
}

export const DownloadLogsButton: React.FC<DownloadButtonProps> = ({ logLines, fileName }) => {
  const { formatMessage } = useIntl();
  const { name } = useCurrentWorkspace();

  const downloadFileWithLogs = () => {
    const file = new Blob([logLines.map((logLine) => logLine.text).join("\n")], {
      type: FILE_TYPE_DOWNLOAD,
    });
    downloadFile(file, fileizeString(`${name}-${fileName}.txt`));
  };

  return (
    <Button
      onClick={downloadFileWithLogs}
      variant="secondary"
      title={formatMessage({
        id: "jobHistory.logs.downloadLogs",
      })}
      icon={<FontAwesomeIcon icon={faFileDownload} />}
    />
  );
};
