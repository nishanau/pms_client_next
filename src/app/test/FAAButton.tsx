"use client";


import { useFindAvAppointments } from "@/hooks/useFindAvAppointment";
import { Button } from "antd";
import React, { useState } from "react";

export default function FindAvailableAppointmentsButton() {
    const [id, setID] = useState<boolean>(false);
    // const [data, setData] = useState();
    const { data, isLoading, error } = useFindAvAppointments(1, new Date("2023-08-15T00:00:00.000Z"));



    return (
        <>
            <Button onClick={
                () => setID(true)
            }> Find available appointments </Button>

            {id && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
    );
}
