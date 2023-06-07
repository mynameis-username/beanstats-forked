"use client"

import FileUpload from "@/app/upload/components/upload";
import {useState} from "react";
import {processBCFile, Statistics as BrewStatistics} from "@/lib/beanconqueror/statistics";
import Statistics from "@/app/upload/components/statistics";
import Link from "next/link";

export default function Home() {
    const [data, setData] = useState<BrewStatistics>();
    const retrieveData = (data: BrewStatistics) => {
        setData(data);
    }

    return (
        <main className="flex h-full flex-col items-center px-2 md:px-24 pb-12">
            <div className={"flex flex-col items-center w-full max-w-5xl space-y-4"}>
                <h1 className={"text-4xl md:text-6xl font-bold text-center"}>
                    <span className={"gradient-text"}>Upload</span> a Beanconqueror file to view your data
                </h1>
                <p className={"text-lg text-center"}>
                    <Link
                        className={"underline"}
                        href={"https://beanconqueror.com/"}
                        target={"_blank"}
                    >
                        Beanconqueror
                    </Link> is an app to track your coffee brews
                </p>
                {!data && <FileUpload callback={(contents) => processBCFile(contents, retrieveData)}/>}
                {!!data && <Statistics {...data} />}
            </div>
        </main>
    )
}
