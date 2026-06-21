import { useState } from "react";
import { Button, Input, Modal, showToast, Loader } from "./components/ui";

export default function Demo() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 text-white font-prompt space-y-6">
        <h2 className="text-3xl font-prompt text-green-300">Input :</h2>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter something..."
      />

      <Button label="Open Modal" onClick={() => setOpen(true)} />

        <Button label="Show Toast" onClick={() => showToast("Saved !", "success")} />
      
       <h2 className="text-3xl font-prompt text-green-300">Loader :</h2>
      <Loader size={50} />

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <p>This matches your green glass UI ✨</p>
      </Modal>

    </div>
  );
}