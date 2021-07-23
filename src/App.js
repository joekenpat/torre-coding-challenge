import React, { useEffect, useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import SearchBox from "./components/SearchBox";
function App() {
  const [open, setOpen] = useState(false);

  // Ensure it animates in when loaded
  useEffect(() => {
    setOpen(true);
  }, []);
  const onDismiss = () => setOpen(false);
  return (
    <div>
      <button size="sm" onClick={() => setOpen(true)}>
        Open
      </button>
      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        defaultSnap={({ maxHeight }) => maxHeight * 0.4}
        snapPoints={({ maxHeight }) => [
          maxHeight * 0.4,
          maxHeight * 0.6,
          maxHeight * 0.8,
        ]}
        expandOnContentDrag={true}
        header={SearchBox()}
        blocking={false}
      >
        Lorem ipsum sit amet, consectetur adipisicing elit. Laboriosam molestias
        quis nostrum minus cupiditate nisi, eveniet animi blanditiis
        reprehenderit veniam natus saepe incidunt perspiciatis. Blanditiis
        debitis temporibus dolores nisi ipsa.
      </BottomSheet>
    </div>
  );
}

export default App;
