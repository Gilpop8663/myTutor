import Layout from "@components/layout";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Schedule() {
  const [value, onChange] = useState(new Date());
  return (
    <Layout title="수업 일정">
      <div className="mt-16 flex w-full justify-center">
        <Calendar onChange={onChange} value={value} calendarType="Arabic" />
      </div>
      <div className="mt-24 flex h-80 justify-center bg-[#314A72]">
        <span className="mt-8 text-7xl font-medium text-white">
          {new Date(value).getDate()}
        </span>
      </div>
    </Layout>
  );
}

export default Schedule;
