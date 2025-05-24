import React from "react";
import { SessionStatus } from "@/app/types";

interface BottomToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (val: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown: () => void;
  handleTalkButtonUp: () => void;
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (val: boolean) => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (val: boolean) => void;
}

function Bottom({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
  isAudioPlaybackEnabled,
  setIsAudioPlaybackEnabled,
}: BottomToolbarProps) {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  function getConnectionButtonLabel() {
    if (isConnected) return "Disconnect";
    if (isConnecting) return "Connecting...";
    return "Connect";
  }

  function getConnectionButtonClasses() {
    // Base classes for the connection button, designed for responsiveness
    const baseClasses =
      "text-white text-sm font-medium py-2.5 px-5 w-full sm:w-auto sm:min-w-[140px] rounded-lg h-11 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-opacity-75 transition-all duration-150 ease-in-out";
    const cursorClass = isConnecting ? "cursor-not-allowed opacity-70" : "cursor-pointer";

    if (isConnected) {
      // Connected state: red button
      return `bg-red-600 hover:bg-red-700 focus:ring-red-500 ${cursorClass} ${baseClasses}`;
    }
    // Disconnected or connecting state: dark slate button
    return `bg-slate-700 hover:bg-slate-800 focus:ring-slate-500 ${cursorClass} ${baseClasses}`;
  }

  return (
    // Main toolbar container:
    // - p-4: Padding around the toolbar
    // - flex: Enables flexbox layout
    // - flex-wrap: Allows items to wrap to the next line on smaller screens
    // - items-center: Aligns items vertically to the center
    // - justify-center: Centers items horizontally
    // - gap-x-6: Horizontal gap between items
    // - gap-y-4: Vertical gap between items when they wrap
    // - bg-white dark:bg-gray-900: Background color with dark mode support
    // - shadow-lg: Adds a larger shadow for better depth
    // - rounded-lg: Applies rounded corners to the toolbar itself
    <div className="p-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <button
        onClick={onToggleConnection}
        className={getConnectionButtonClasses()}
        disabled={isConnecting}
      >
        {getConnectionButtonLabel()}
      </button>

      {/* Push to Talk Section */}
      {/* This group uses flex-wrap to allow its children (checkbox, label, button) to wrap if space is tight */}
      <div className="flex flex-row items-center flex-wrap justify-center gap-x-3 gap-y-2">
        <input
          id="push-to-talk"
          type="checkbox"
          checked={isPTTActive}
          onChange={(e) => setIsPTTActive(e.target.checked)}
          disabled={!isConnected}
          // Checkbox styling:
          // - peer: For styling the label based on checkbox state (e.g., peer-disabled)
          // - w-5 h-5: Slightly larger for better touch interaction
          // - accent-blue-600: Colors the checkmark
          // - rounded: Rounds the checkbox
          // - focus:ring-*: Adds a focus ring
          // - disabled:*: Styles for disabled state
          className="peer w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label
          htmlFor="push-to-talk"
          // Label styling:
          // - text-sm font-medium: Text styling
          // - text-gray-700 dark:text-gray-200: Text color with dark mode
          // - select-none: Prevents text selection
          // - cursor-pointer: Indicates clickability
          // - ml-1 mr-2: Small margins for spacing around the checkbox and talk button
          // - peer-disabled:*: Styles label when the associated peer (checkbox) is disabled
          className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none cursor-pointer ml-1 mr-2 peer-disabled:opacity-60 peer-disabled:cursor-not-allowed"
        >
          Push to talk
        </label>
        <button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown} // Ensure touch events are handled
          onTouchEnd={handleTalkButtonUp}     // Ensure touch events are handled
          disabled={!isPTTActive}
          // Talk button styling:
          // - Base styles: padding, text size, font weight, rounded corners, shadow, transitions
          // - Conditional styles for active/inactive PTT and speaking state
          // - Dark mode variants for colors
          className={`
            py-2 px-4 text-sm font-medium rounded-lg shadow-sm transition-all duration-150 ease-in-out
            ${!isPTTActive
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-70"
              : isPTTUserSpeaking
                ? "bg-green-500 hover:bg-green-600 text-white ring-2 ring-green-300 dark:ring-green-700 cursor-pointer"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 cursor-pointer"
            }
          `}
        >
          Talk
        </button>
      </div>

      {/* Audio Playback Section */}
      <div className="flex flex-row items-center gap-2">
        <input
          id="audio-playback"
          type="checkbox"
          checked={isAudioPlaybackEnabled}
          onChange={(e) => setIsAudioPlaybackEnabled(e.target.checked)}
          disabled={!isConnected}
          className="peer w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label
          htmlFor="audio-playback"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none cursor-pointer peer-disabled:opacity-60 peer-disabled:cursor-not-allowed"
        >
          Audio playback
        </label>
      </div>

      {/* Logs Section */}
      <div className="flex flex-row items-center gap-2">
        <input
          id="logs"
          type="checkbox"
          checked={isEventsPaneExpanded}
          onChange={(e) => setIsEventsPaneExpanded(e.target.checked)}
          // No disabled prop in original, assuming it can always be toggled.
          // If it should be disabled based on connection: disabled={!isConnected}
          className="peer w-5 h-5 accent-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <label
          htmlFor="logs"
          className="text-sm font-medium text-gray-700 dark:text-gray-200 select-none cursor-pointer peer-disabled:opacity-60 peer-disabled:cursor-not-allowed"
        >
          Logs
        </label>
      </div>
    </div>
  );
}

export default Bottom;
