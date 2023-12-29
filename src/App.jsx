import { useEffect, useState, useRef } from 'react'
import CardsContainer from './components/CardsContainer'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import FloatingButton from './components/FloatingButton';
import NewCardShape from './components/NewCardShape';

const MODES = {
  normal: "normal", 
  create: "create", 
  edit: "edit"
};

function App() {
  const [mode, setMode] = useState(MODES.normal);
  const [newCardPosition, setNewCardPosition] = useState(null);
  const [isNewCardActive, setIsNewCardActive] = useState(false);
  const [isShapeFollowing, setShapeFollow] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const transformComponentRef = useRef(null);

  useEffect(() => {
    if (mode == MODES.normal) {
      setIsNewCardActive(false);
      setShapeFollow(false);
    } else if (mode === MODES.create) {
      setIsNewCardActive(true);
      setShapeFollow(true);
    }
  }, [mode]);

  const handleZoom = (a, ev) => {
    if (ev.deltaY > 0) {
      document.body.style.cursor = "zoom-out";
    } else if (ev.deltaY < 0) {
      document.body.style.cursor = "zoom-in";
    }
  }

  const handlePanning = () => {
    document.body.style.cursor = "all-scroll";
    setShapeFollow(false);
  }

  const handlePanningStop = () => {
    document.body.style.cursor = "default";
    setShapeFollow(true);
  }

  const handleResetCursor = () => {
    document.body.style.cursor = "default";
  }

  const handleClickAdd = () => {
    if (isCreating) return;
    setMode(MODES.create);
  };
  
  const handleClickEdit = () => {
    if (isCreating) return;
    console.log("Edit mode");
    setMode(MODES.edit);
  }
  
  const handleClickCenter = () => {
    console.log(transformComponentRef)
    transformComponentRef.current?.centerView();
  };

  const handleSubmitNewCardPosition = (position) => {
    setNewCardPosition(position);
    setIsCreating(true);
    setMode(MODES.normal);
  }

  const handleCancel = () => {
    setMode(MODES.normal);
  }

  const handleCreationStop = () => {
    setNewCardPosition(null);
    setIsCreating(false);
  }


  return (
    <main style={{
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    }}>
      <TransformWrapper
        onZoom={handleZoom}
        onZoomStop={handleResetCursor}
        onPanningStart={handlePanning}
        onPanningStop={handlePanningStop}
        onPinching={(a, b) => console.log("onPinching event", a.state.previousScale)}
        panning={{excluded: ['panningDisabled', 'allDisabled']}}
        pinch={{excluded: ['pinchDisabled', 'allDisabled']}}
        wheel={{excluded: ['wheelDisabled', 'allDisabled']}}
        ref={transformComponentRef}
        initialScale={.7}
        minScale={.7} 
        centerOnInit
      >
        <TransformComponent>
          <h1 style={{
            position: "absolute",
            top: "1rem",
            textAlign: "center",
            width: "100%",
            color: "#0001",
            fontSize: "5rem",
            fontWeight: "bold",

          }}>2024 resolutions board</h1>
          <CardsContainer 
            newCardPosition={newCardPosition} 
            onCreatingStop={handleCreationStop} 
            isEditMode={mode === MODES.edit} 
          />
          <NewCardShape transformRef={transformComponentRef} active={isNewCardActive} follow={isShapeFollowing} onClick={handleSubmitNewCardPosition}/>
          <NewCardShape a transformRef={transformComponentRef} active={isNewCardActive} follow={isShapeFollowing} onClick={handleSubmitNewCardPosition}/>
        </TransformComponent>
      </TransformWrapper>
      <FloatingButton 
        inCancelMode={[MODES.create, MODES.edit].includes(mode)} 
        onCancel={handleCancel} 
        disabled={isCreating}
        onClickAdd={handleClickAdd}
        onClickEdit={handleClickEdit}
        onClickCenter={handleClickCenter}
      />
      <div style={{
        position: "absolute",
        bottom: "1rem",
        left: "1rem",
        color: "#0005",
        fontSize: "1rem",
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
      }}>
        Made with <span style={{color: "#f00"}}>🧠</span> by <a href="https://twitter.com/patzidev">@patzidev</a>
      </div>
    </main >
  )
}

export default App
