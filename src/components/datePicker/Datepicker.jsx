import React, { useState } from 'react'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Badge from '@mui/material/Badge';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import CheckIcon from '@mui/icons-material/Check';
import './datepicker.scss'

const Datepicker = () => {

    const [value, setValue] = useState(dayjs());
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
                orientation="portrait"
                openTo="day"
                value={value}
                // disableFuture
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
                renderDay={(day, _value, DayComponentProps) => {
                    const isSelected =
                        !DayComponentProps.outsideCurrentMonth &&
                        highlightedDays.indexOf(day.date()) >= 0;

                    return (
                        <Badge
                            key={day.toString()}
                            overlap="circular"
                            // badgeContent={isSelected ? '🌚' : undefined}
                            badgeContent={isSelected ? <CheckIcon /> : undefined}
                        >
                            <PickersDay {...DayComponentProps} />
                        </Badge>
                    );
                }}
            />
        </LocalizationProvider>
    )
}

export default Datepicker