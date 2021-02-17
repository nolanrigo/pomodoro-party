import { SessionType } from "../models/session";

export function colorFromSessionType(type?: SessionType): string {
  switch (type) {
    case SessionType.work:
      return "bg-red-500";
    case SessionType.shortbreak:
      return "bg-blue-500";
    case SessionType.longbreak:
      return "bg-indigo-600";
    default:
      return "bg-gray-500";
  }
}
