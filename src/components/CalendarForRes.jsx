import { useEffect, useState } from "react";
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";
import "../css/Calendar.css";
import { differenceInCalendarDays } from "date-fns";


const CalendarForRes = ({ startDate, endDate, setDates }) => {

    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setDate(currentDate.getDate() + 30);


    // const [state, setState] = useState({
    //     startDate: null,
    //     endDate: null,
    // });


    const setChangeDate = (dates) => {
        const [start, end] = dates;
        // const newNightsCount = getNightsCount();
        setDates({ startDate: start, endDate: end });

        // if (state.startDate && state.endDate) {
        //     setState(prevState => {
        //         calendarData({ startDate: start, endDate: end, newNightsCount });
        //         return { ...prevState, startDate: start, endDate: end };
        //     });

        // setState({ startDate: start, endDate: end }, () => {
        //     // setState의 콜백 내에서 상태가 업데이트된 후에 부모 컴포넌트로 데이터를 보냅니다.
        //     // 새로운 밤 수를 계산하기 위해 새로운 날짜를 사용합니다.
        //     // const newNightsCount = start && end ? differenceInCalendarDays(end, start) : 0;
        //     calendarStartData({ startDate: start });
        //     calendarEndData({ endDate: end });
        // });
        console.log("날짜 변화",);
    }

    const nightsCount = startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;



    // const getNightsCount = () => {
    //     if (state.startDate && state.endDate) {
    //         return differenceInCalendarDays(state.endDate, state.startDate);
    //     }
    //     return 0;
    // };

    // const nightsCount = getNightsCount();


    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <DatePicker
                selectsRange={true}
                className="datepicker"
                locale={ko}
                dateFormat="yyyy년 MM월 dd일"
                // selected={state.startDate}
                startDate={startDate}
                endDate={endDate}
                minDate={currentDate} // 현재 날짜부터만 선택 가능하도록 설정
                maxDate={maxDate} // 현재 날짜로부터 30일 이후까지 선택 가능
                onChange={setChangeDate}
            />
            {endDate && (
                <input
                    style={{
                        // marginLeft: '4px', // Space between the DatePicker and the input
                        padding: '0.5rem', // Same padding as the DatePicker inputs for consistency
                        fontSize: '15px', // Match the font size with the DatePicker or as needed
                        fontWeight: 'bold', // Optional: if you want the font weight to be bold
                        width: '60px', // Automatically adjust the width of the input
                        textAlign: 'center', // Center the text inside the input box
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                    }}
                    type="text"
                    readOnly // Make it read-only if it shouldn't be editable
                    value={`${nightsCount}박`} // Set the value to the calculated nights
                />
            )}
        </div>
    );

}

export default CalendarForRes;