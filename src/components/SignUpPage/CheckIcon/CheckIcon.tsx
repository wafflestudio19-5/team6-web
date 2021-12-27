import styles from "./CheckIcon.module.scss";
import { ClickAwayListener, IconButton, Tooltip } from "@mui/material";
import Check from "../../../icons/Signup/check.png";
import Cross from "../../../icons/Signup/cross.png";
import { useState } from "react";

const CheckIcon = ({
  config,
  configMessage,
}: {
  config: boolean;
  configMessage: string;
}) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      {config ? (
        <IconButton tabIndex={-1} className={styles.iconbutton}>
          <img src={Check} />
        </IconButton>
      ) : (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={configMessage}
            placement="top-end"
            arrow
          >
            <IconButton
              tabIndex={-1}
              className={styles.iconbutton}
              onClick={handleTooltipOpen}
            >
              <img src={Cross} />
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      )}
    </>
  );
};

export default CheckIcon;
