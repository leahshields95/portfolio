
export type DropdownProps = {
  optionName: string;
  onSelect: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

export default function Dropdown(props: DropdownProps) {
  return (
    <div className="py-5">
      <select onChange={(event) => props.onSelect(event.target.value)} disabled={props.disabled} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5">
        <option className="hidden" value="default">Select a {props.optionName}</option>
        {props.options && props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
