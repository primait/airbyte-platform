import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useIntl } from "react-intl";

import { Button } from "components/ui/Button";

import { useCurrentWorkspace } from "core/api";
import { JobDebugInfoRead } from "core/request/AirbyteClient";
import { FILE_TYPE_DOWNLOAD, downloadFile, fileizeString } from "core/utils/file";

interface DownloadButtonProps {
  jobDebugInfo: JobDebugInfoRead;
  fileName: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ jobDebugInfo, fileName }) => {
  const { formatMessage } = useIntl();
  const { name } = useCurrentWorkspace();

  const downloadFileWithLogs = () => {
    const file = new Blob([jobDebugInfo.attempts.flatMap((info) => info.logs.logLines).join("\n")], {
      type: FILE_TYPE_DOWNLOAD,
    });
    downloadFile(file, fileizeString(`${name}-${fileName}.txt`));
  };

  return (
    <Button
      onClick={downloadFileWithLogs}
      variant="secondary"
      title={formatMessage({
        id: "sources.downloadLogs",
      })}
      icon={<FontAwesomeIcon icon={faFileDownload} />}
    />
  );
};

export default DownloadButton;
