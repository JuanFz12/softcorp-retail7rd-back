import { Named, UserAttributes } from "../../../../shared";

interface Props extends Pick<UserAttributes, 'id' | 'name' | 'role'> {
    language: string;
    groups: Named[];
    configurations: number;
    isActive: boolean;
}
export class UserMapper {
    static user(props: Props) {



    }
}