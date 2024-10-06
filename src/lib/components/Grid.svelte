<script context="module" lang="ts">
  export type GridColumnDefinition = {
    dataName: string; // Name of the field in the data object for this column.
    displayName: string; // Display name for this column.
    width: string; // Column width.
    isSortable?: boolean; // Indicates whether this column is sortable.
    converter?: (data: any) => string; // Optional function to convert data before display.
    textAlign?: string; // Text alignment.
  };
</script>

<script lang="ts">
  export let columns: GridColumnDefinition[];
  export let data: any[];

  const defaultColumnProperties = {
    isSortable: false,
    textAlign: "left",
  };

  function getCellData(row: any, column: GridColumnDefinition): string {
    const data = row[column.dataName];
    if (!column.converter) {
      return data;
    }

    return column.converter(data);
  }
</script>

<table>
  <thead>
    <tr>
      {#each columns as column}
        <th scope="col" style="text-align: {column.textAlign}; width: {column.width};">{column.displayName}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each data as row}
      <tr>
        {#each columns as column}
          <td style="text-align: {column.textAlign};">{getCellData(row, column)}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid;
    cursor: pointer;
  }

  thead {
    background-color: #0066b2;
    color: #edf2f8;
  }

  th, td {
    padding: 0.6em;
    border: 1px solid black;
  }

  tbody tr:hover {
    background-color: #d9e2ef;
  }
</style>
