import { Button, Tooltip } from "@mui/material";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type CopyButtonProps = {
  isCopied: boolean;
  onCopy: () => void;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ isCopied, onCopy }) => (
  <Tooltip open={isCopied} title="Short URL copied">
    <Button
      startIcon={<ContentCopyIcon />}
      variant="outlined"
      size="small"
      onClick={onCopy}
      sx={{ textTransform: "none", width: "75px", marginLeft: "auto" }}
    >
      Copy
    </Button>
  </Tooltip>
);
