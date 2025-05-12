export class CreateChatDTO {
  name: string;
  members: string[] | { userName: string }[];
  type: string;
}
