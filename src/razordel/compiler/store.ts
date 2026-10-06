const display: string[] = [
    "flex", "grid", "block", "inline-block", "inline-flex",
    "inline-grid", "inline", "table", "table-row",
    "table-cell", "list-item", "none",
    "contents", "flow-root"
];

const position: string[] = [
    "static", "relative", "absolute", "fixed", "sticky"
];

const textalign: string[] = [
    "left", "right", "center", "justify", "start", "end","match-parent"
];
const flexDirection: string[] = [
    "row", "row-reverse", "column", "column-reverse"
];

const flexWrap: string[] = [
    "nowrap", "wrap", "wrap-reverse"
];

const justifyContent: string[] = [
    "flex-start", "flex-end", "center",
    "space-between", "space-around", "space-evenly"
];

const alignItems: string[] = [
    "flex-start", "flex-end", "center",
    "baseline", "stretch"
];

export const properties = {
    display,
    position,
    textalign,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems
};