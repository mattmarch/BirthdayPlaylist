import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";

type Props = {
  disabled: boolean;
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
};

const BirthdayPicker = (props: Props) => {
  const [birthdayDate, setBirthdayDate] = useState(
    props.selectedDate ? props.selectedDate : new Date()
  );

  return (
    <Container>
      <h3>Enter your birthday below:</h3>
      <CenteredDatePicker
        selected={birthdayDate}
        onChange={(date: Date) =>
          date ? setBirthdayDate(date) : setBirthdayDate(new Date())
        }
        dateFormat="dd/MM/yyyy"
        minDate={new Date(1900, 0, 1)}
        maxDate={new Date()}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      <SubmitButton
        disabled={props.disabled}
        onClick={() => props.onDateSelect(birthdayDate)}
      >
        Find me a playlist
      </SubmitButton>
    </Container>
  );
};

const CenteredDatePicker = styled(DatePicker)`
  text-align: center;
  width: 100%;
`

const SubmitButton = styled.button`
  margin: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  align-items: stretch;
`;

export default BirthdayPicker;
