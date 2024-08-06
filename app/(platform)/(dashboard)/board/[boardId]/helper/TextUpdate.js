import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { Pencil } from "lucide-react";

function TextUpdateNode({ data, isConnectable, ...rest }) {
  const { setNodes } = useReactFlow();
  const [disabled, setDisabled] = useState(true);
  const [stopPropagation, setStopPropagation] = useState(true);

  const onChange = useCallback(
    (evt) => {
      if (evt.target.value) {
        const { id } = rest;
        setNodes((nodes) => {
          return nodes.map((item) => {
            if (item.id === id) {
              item.data.label = evt.target.value;
            }
            return item;
          });
        });
      }
    },
    [rest, setNodes]
  );

  return (
    <div
      spellCheck="false"
      className={clsx("text-updater-node", rest.id > 0 && "initial-node")}
    >
      {rest.id > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
          id="node-target"
          className="mb-2"
        />
      )}
      <div>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className={clsx(
            !disabled && "nodrag editable",
            "nodrag",
            setStopPropagation && "stopPropagation"
          )}
          defaultValue={data.label}
          readOnly={disabled}
          onDoubleClick={() => setDisabled(false)}
          onBlur={() => {
            setDisabled(true);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setDisabled(true);
            }
          }}
        />
        {/* <Pencil
          className="h-4 w-4 mr-2"
          onClick={() => setStopPropagation(!stopPropagation)}
        /> */}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        id="node-source"
      />
    </div>
  );
}

export default TextUpdateNode;
