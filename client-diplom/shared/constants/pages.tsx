import { title } from "process";
import { ROUTE } from "./routes";
import { HomeIcon, CalendarIcon, UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export const PAGES = [
    {
        title: 'Главная',
        link: ROUTE.DASHBOARD,
        icon: HomeIcon
    },
    {
        title: 'Расписание',
        link: ROUTE.SCHEDULE,
        icon: CalendarIcon
    },
    {
        title: 'Выйти',
        link: ROUTE.LOGIN,
        icon: UserIcon
    }
]