import IBotEvents from "./IBotEvents";

type IEvents = { [Key in keyof IBotEvents]?: [arg: unknown] }

export default IEvents;
