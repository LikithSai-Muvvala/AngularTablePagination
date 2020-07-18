import { Component, OnInit } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  columns: string[] = ["id", "name"];
  pageSizes: number[] = [5, 7, 10];
  pageSize = 5;
  pageObj = {
    pageNumber: 0,
    totalPages: 0,
    pageItems: []
  };

  data = [];
  tableData = [];

  ngOnInit() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    for (let idx = 0; idx < 50; idx++) {
      let rowObj = {
        id: idx + 1,
        name: `Name ${idx + 1}`
      };
      this.data.push(rowObj);
    }
    this.setTableData("");
  }

  setTableData(filterVal: string) {
    if (filterVal && filterVal.trim().length !== 0) {
      filterVal = filterVal.trim().toLowerCase();
      this.tableData = [];
      let dataLen = this.data.length;
      for (let idx = 0; idx < dataLen; idx++) {
        let rowObj = this.data[idx];
        for (let key of this.columns) {
          if (rowObj[key] && rowObj[key].toString().toLowerCase().includes(filterVal)) {
            this.tableData.push(rowObj);
            break;
          }
        }
      }
    } else {
      this.tableData = this.data.slice();
    }
    this.pageObj = {
      pageNumber: 0,
      totalPages: Math.ceil(this.tableData.length / this.pageSize),
      pageItems: []
    };
    this.nextPage();
  }

  nextPage() {
    let pageNumber = this.pageObj.pageNumber + 1;
    let totalPages = this.pageObj.totalPages;
    if (totalPages >= pageNumber && this.tableData.length > 0) {
      this.pageObj.pageNumber = pageNumber;
      this.pageObj.pageItems = this.tableData.slice(
        pageNumber * this.pageSize - this.pageSize,
        pageNumber * this.pageSize
      );
    }
  }

  prevPage() {
    let pageNumber = this.pageObj.pageNumber - 1;
    if (pageNumber > 0 && this.tableData.length > 0) {
      this.pageObj.pageNumber = pageNumber;
      this.pageObj.pageItems = this.tableData.slice(
        pageNumber * this.pageSize - this.pageSize,
        pageNumber * this.pageSize
      );
    }
  }

  onFilterClick(event) {
    if (event != undefined && event != null) {
      this.setTableData(event.value);
    }
  }
}
