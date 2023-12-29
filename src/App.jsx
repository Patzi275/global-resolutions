import { useEffect, useState, useRef } from 'react'
import CardsContainer from './components/CardsContainer'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import FloatingButton from './components/FloatingButton';
import NewCardShape from './components/NewCardShape';
import HelpDialog from './components/HelpDialog';

const MODES = {
  normal: "normal",
  create: "create",
  edit: "edit",
  help: "help",
};

function isMobile() {
  console.log(navigator.userAgent)
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isInLandscape() {
  return window.matchMedia("(orientation: landscape)").matches;
}

function isComputer() {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  return !isMobile;
}

function lockScreenOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("landscape").catch((error) => {
      console.error("Failed to lock screen orientation:", error);
    });
  } else if (screen.lockOrientation) {
    screen.lockOrientation("landscape").catch((error) => {
      console.error("Failed to lock screen orientation:", error);
    });
  } else if (screen.mozLockOrientation) {
    screen.mozLockOrientation("landscape").catch((error) => {
      console.error("Failed to lock screen orientation:", error);
    });
  } else if (screen.msLockOrientation) {
    screen.msLockOrientation("landscape").catch((error) => {
      console.error("Failed to lock screen orientation:", error);
    });
  } else {
    console.warn("Screen orientation lock is not supported.");
  }
}

function App() {
  const isFirstTime = localStorage.getItem("firstTime") === null;
  const [mode, setMode] = useState(isFirstTime ? MODES.help : MODES.normal);
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

  const handleClickHelp = () => {
    setMode(MODES.help);
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
    localStorage.setItem("firstTime", "false");
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
      {
        isMobile()
          ? <div style={{
            position: "absolute",
            fontSize: "2rem",
            padding: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            textAlign: "center",
            fontWeight: "bold",
            color: "#0005",
          }}>
            This app is not optimized for mobile devices. Please use a computer.
          </div>

          : <div>


            {mode === MODES.help && <HelpDialog />}
            <TransformWrapper
              onZoom={handleZoom}
              onZoomStop={handleResetCursor}
              onPanningStart={handlePanning}
              onPanningStop={handlePanningStop}
              onPinching={(a, b) => console.log("onPinching event", a.state.previousScale)}
              panning={{ excluded: ['panningDisabled', 'allDisabled'] }}
              pinch={{ excluded: ['pinchDisabled', 'allDisabled'] }}
              wheel={{ excluded: ['wheelDisabled', 'allDisabled'] }}
              ref={transformComponentRef}
              initialScale={.7}
              minScale={.5}
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
                <NewCardShape transformRef={transformComponentRef} active={isNewCardActive} follow={isShapeFollowing} onClick={handleSubmitNewCardPosition} />
                <NewCardShape a transformRef={transformComponentRef} active={isNewCardActive} follow={isShapeFollowing} onClick={handleSubmitNewCardPosition} />
              </TransformComponent>
            </TransformWrapper>
            <FloatingButton
              inCancelMode={[MODES.create, MODES.edit, MODES.help].includes(mode)}
              onCancel={handleCancel}
              disabled={isCreating}
              onClickAdd={handleClickAdd}
              onClickEdit={handleClickEdit}
              onClickCenter={handleClickCenter}
              onClickHelp={handleClickHelp}
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
              Made with <span style={{ color: "#f00" }}>🧠</span> by <a href="https://twitter.com/patzidev">@patzidev</a>
            </div>
          </div>
      }
    </main >
  )
}

export default App
