import { CATEGORIES, LEVELS } from "../constants/const";

type Level =
  | "Escuelita"
  | "1-B"
  | "1-A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";
type Category =
  | "Pre mini"
  | "Mini"
  | "Pre infantil"
  | "Infantil"
  | "Juvenil"
  | "Mayores";

export const parseMember = (member: MemberInfoWithIDs, user: UserInfo) => {
  const levelMap = Object.fromEntries(
    LEVELS.filter((l) => l.value !== 0).map((l) => [l.value, l.label])
  ) as Record<number, Level>;

  const categoryMap = Object.fromEntries(
    CATEGORIES.filter((c) => c.value !== 0).map((c) => [c.value, c.label])
  ) as Record<number, Category>;
  
  const levelName: Level = levelMap[member.id_level];
  const categoryName: Category = categoryMap[member.id_category];
  const gymName = user.full_name;

  const parsedMember: FullMemberInfo = {
    id: member.id,
    full_name: member.full_name,
    birth_date: member.birth_date,
    age: member.age,
    category: categoryName,
    gym: gymName,
    dni: member.dni,
    level: levelName,
  };

  return parsedMember;
};

export const validateDates = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  return start <= end;
};
