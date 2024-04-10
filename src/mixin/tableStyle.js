export default {
  data() {
    return {
      tableStyle: {
        rowStyle: ({ row, rowIndex }) => {
          if (rowIndex % 2 !== 0) {
            return { background: "#034080 !important", color: "#fff" };
          }
          return { background: "transparent !important", color: "#fff" };
        },
        headerCellStyle: {
          background: "#054F92",
          color: "#fff",
        },
      },
    };
  },
};
