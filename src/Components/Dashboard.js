import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import mockData from "../API/mockData";

//Dashboard Component is called from APP.js when path is equal to '/' through routing 
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "Type", field: "Type" },
        { headerName: "TicketID", field: "TicketID" },
        { headerName: "Summary", field: "Summary" },
        { headerName: "Status", field: "Status" },
        {
          headerName: "CreatedDate",
          field: "CreatedDate",
          //comparator: this.dateComparator,
        },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
        floatingFilter: true,
      },
      rowData: null,
    };
  }

  componentDidMount() {
    const rowData = this.rowData();
    this.setState({ rowData });
  }

  //Grouping the columns
  mapResponseData() {
    if (mockData) {
      const result = mockData.reduce(
        (columnsSoFar, { Type, TicketID, Summary, Status, CreatedDate }) => {
          if (!columnsSoFar[Type]) columnsSoFar[Type] = [];
          columnsSoFar[Type].push({
            Type,
            TicketID,
            Summary,
            Status,
            CreatedDate,
          });
          return columnsSoFar;
        },
        []
      );
      return result;
    }
    return [];
  }


// getting Row data from grouping
  rowData() {
    const data = this.mapResponseData();
    let rows = [];
    if (data) {
      for (const property in data) {
        rows = rows.concat(data[property]);
      }
      return rows;
    }
    return null;
  }

  render() {
    return (
      <div
        className="ag-theme-alpine"
        style={{
          height: "400px",
          width: "90%",
          padding: 20,
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          defaultColDef={this.state.defaultColDef}
          rowData={this.state.rowData}
        />
      </div>
    );
  }
}

export default Dashboard;
