import { useEffect, useState } from "react";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "../css/Calendar.css";
import { differenceInCalendarDays } from "date-fns";


const CalendarForRes = ({ startDate, endDate, setDates }) => {

    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 30);


    const setChangeDate = (dates) => {
        const [start, end] = dates;

        setDates({ startDate: start, endDate: end });

        console.log("날짜 변화",);
    }

    const nightsCount = startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;





    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <DatePicker
                selectsRange={true}
                className="datepicker"
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                startDate={startDate}
                endDate={endDate}
                minDate={currentDate} // 현재 날짜부터만 선택 가능하도록 설정
                maxDate={maxDate} // 현재 날짜로부터 30일 이후까지 선택 가능
                onChange={setChangeDate}
            />
            {endDate && (
                <input
                    style={{

                        padding: '0.5rem',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        width: '60px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    type="text"
                    readOnly
                    value={`${nightsCount}박`}
                />
            )}
        </div>
    );

}

export default CalendarForRes;