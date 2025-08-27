type Level = "1" | "1-B" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
type Category =
  | "Pre mini"
  | "Mini"
  | "Pre infantil"
  | "Infantil"
  | "Juvenil"
  | "Mayores";

export const parseMember = (member: MemberInfoWithIDs, user: UserInfo) => {
  const levelMap: Record<number, Level> = {
    1: "1",
    2: "1-B",
    3: "2",
    4: "3",
    5: "4",
    6: "5",
    7: "6",
    8: "7",
    9: "8",
    10: "9",
    11: "10",
  };

  const categoryMap: Record<number, Category> = {
    1: "Pre mini",
    2: "Mini",
    3: "Pre infantil",
    4: "Infantil",
    5: "Juvenil",
    6: "Mayores",
  };

  const levelName: Level = levelMap[member.id_level] ?? "Desconocido";
  const categoryName: Category =
    categoryMap[member.id_category] ?? "Desconocida";
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
