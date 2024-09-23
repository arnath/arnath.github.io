<script context="module" lang="ts">
  export type GridColumnDefinition = {
    dataName: string; // Name of the field in the data object for this column.
    displayName: string; // Display name for this column.
    isSortable: boolean; // Indicates whether this column is sortable.
    converter?: (data: any) => string;
  };
</script>

<script lang="ts">
  export let columns: GridColumnDefinition[];
  export let data: any[];

  function getCellData(row: any, column: GridColumnDefinition): string {
    const data = row[column.dataName];
    if (!column.converter) {
      return data;
    }

    return column.converter(data);
  }
</script>

<table>
  <tr>
    {#each columns as column}
      <td>{column.displayName}</td>
    {/each}
  </tr>
  {#each data as row}
  <tr>
    {#each columns as column}
      <td>{getCellData(row, column)}</td>
    {/each}
  </tr>
  {/each}
</table>

<style>

</style>
