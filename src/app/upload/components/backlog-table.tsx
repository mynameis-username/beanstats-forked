import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {getAge, getDateString} from "@/lib/dates";
import {Mapping} from "@/types";
import {Bean} from "@/types/beanconqueror";


export interface BacklogTableProps {
    beans: Bean[];
    usage: Mapping<number>;
}

const BacklogTable = (props: BacklogTableProps) => (
    <Table className={"whitespace-nowrap"}>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roaster</TableHead>
                <TableHead>Roasting date</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Consumed</TableHead>
                <TableHead>Available</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {props.beans.map(bean => {
                const usage = props.usage[bean.config.uuid] || 0;
                const remaining = bean.weight - usage;
                return (
                    <TableRow key={bean.config.uuid}>
                        <TableCell>{bean.name}</TableCell>
                        <TableCell>{bean.roaster}</TableCell>
                        <TableCell>{getDateString(bean.roastingDate ? new Date(bean.roastingDate): null, false)}</TableCell>
                        <TableCell>{getAge(bean.roastingDate)}</TableCell>
                        <TableCell>{bean.weight ? `${bean.weight} gr`: "-"}</TableCell>
                        <TableCell>{props.usage[bean.config.uuid] ? `${props.usage[bean.config.uuid]} gr`: "-"}</TableCell>
                        <TableCell>{bean.weight ? `${remaining} gr` : "-"}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    </Table>
    );

export default BacklogTable
