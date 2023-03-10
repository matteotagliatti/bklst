import { Command } from "cmdk";

export default function Menu() {
  return (
    <Command label="Command Menu">
      <Command.Input placeholder="Search a command" />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Item>List Books</Command.Item>
      </Command.List>
    </Command>
  );
}
