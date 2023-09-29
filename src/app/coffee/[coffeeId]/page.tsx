import {Title} from "@/components/layout/title";
import {User} from "@clerk/nextjs/api";
import {currentUser} from "@clerk/nextjs";
import {notFound} from "next/navigation";
import {canView} from "@/lib/perms";
import {getBeanDetails} from "@/lib/db/beans/get-bean-details";
import {BeanDetail} from "@/app/coffee/[coffeeId]/components/bean-detail";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import Image from "next/image";

function Buttons({user, bean} :{user: User | null, bean: Awaited<ReturnType<typeof getBeanDetails>>}) {
    if (!bean || !user ||  user.publicMetadata.databaseId !== bean.userId) return null;

    return (
        <div className={"flex flex-row-reverse gap-2"}>
            <Link href={`/coffee/${bean.publicId}/edit`} className={buttonVariants({size: "sm", variant: "outline"})}>
                Edit
            </Link>
            {/*<BeanConquerorButton bean={bean} />*/}
        </div>
    );
}

function BeanConquerorButton({bean}: {bean:Awaited<ReturnType<typeof getBeanDetails>>}) {
    return (
        <Button variant={"outline"} size={"sm"}>
            <Image src={"/beanconqueror_logo.png"} alt={"Beanconqueror logo"} height={20} width={20} />
        </Button>
    )
}

export default async function CoffeeDetailPage({ params }: { params: { coffeeId: string } }) {
    const user: User | null = await currentUser();
    const bean =  await getBeanDetails(params.coffeeId, user?.publicMetadata?.databaseId as number || undefined)

    if (!bean || !canView(user, bean)) return notFound();

    return (
        <>
            <Title
                title={bean.name}
                subtitle={`Roasted by ${bean.roaster.name}`}
            />
            <Buttons user={user} bean={bean} />
            <BeanDetail bean={bean} />
        </>
    )
}