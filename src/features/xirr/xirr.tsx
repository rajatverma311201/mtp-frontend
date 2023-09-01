import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import XIRR from "./calcXirr";
import moment from "moment";

function Xirr() {
  console.log("rerender");
  const [date, setDate] = useState<Date | undefined>();
  const [dates, setDates] = useState<Date[]>([]);
  const [values, setValues] = useState<number[]>([]);

  const [xirr, setXirr] = useState(0);
  // const [amount, setAmount] = useState<number | undefined>();

  // const [len, setLen] = useState(0);

  // let btn = "";

  function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const amt = +e.currentTarget.amount.value;
    console.log({ date, amt });
    if (date && amt) {
      setDates((d) => [...d, date]);
      setValues((v) => [...v, amt]);
    }
  }

  function calcXirr(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const maturityAmt = +e.currentTarget.maturityAmt.value;

    if (maturityAmt) {
      const convertedDates = [...dates, date].map((d) => {
        const formattedDate = moment(d.toISOString()).format("YYYY/MM/DD");
        const convertedDate = moment(formattedDate, "YYYY/MM/DD");

        return convertedDate;
      });

      setXirr(+XIRR([...values, maturityAmt], convertedDates));
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl">
        XIRR Calculator
      </h1>
      <form onSubmit={handleAdd}>
        <div className="flex ">
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            // onChange={(e) => setAmount(+e.target.value)}
          />
          <DatePicker setDate={setDate} />
        </div>
        <Button>Submit</Button>
      </form>
      <form onSubmit={calcXirr}>
        <div className="flex">
          <Input
            type="number"
            placeholder="Maturity Amount"
            name="maturityAmt"
          />
          <DatePicker setDate={setDate} />
        </div>
        <Button>Calculate</Button>
      </form>
      {(xirr * 100).toFixed(2)}%
    </>
  );
}

export default Xirr;
