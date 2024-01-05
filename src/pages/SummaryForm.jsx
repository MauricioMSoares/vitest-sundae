import React from "react";
import { useState } from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const SummaryForm = () => {
  const [disabled, setDisabled] = useState(true);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        No ice cream will actually be delivered
      </Popover.Body>
    </Popover>
  );

  return (
    <div>
      <input type="checkbox" id="terms-and-conditions-checkbox" onChange={() => setDisabled(!disabled)} />
        <OverlayTrigger placement="right" overlay={popover}>
          <label htmlFor="terms-and-conditions-checkbox">I agree with the terms and conditions</label>
        </OverlayTrigger>
      <button disabled={disabled}>Confirm order</button>
    </div>
  );
};

export default SummaryForm;