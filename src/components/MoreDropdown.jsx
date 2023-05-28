import React from "react";

const MoreDropdown = ({ more, settings, setSettings }) => {
  function gridHandler() {
    console.log(settings?.showGrids);
    if (settings?.showGrids) {
      setSettings({
        ...settings,
        showGrids: false,
      });
      return;
    }
    setSettings({
      ...settings,
      showGrids: true,
    });
  }
  function lazyRadiusClickHandler() {
    if (settings?.lazyRadius > 0) {
      setSettings({ ...settings, lazyRadius: 0 });
      return;
    }
    setSettings({ ...settings, lazyRadius: 40 });
  }
  return (
    <div
      id="dropdownToggle"
      className={`z-10 absolute ${
        more ? "" : "hidden"
      } bg-white divide-y divide-gray-100 rounded-lg shadow w-56 dark:bg-gray-700 dark:divide-gray-600`}
    >
      <ul
        className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownToggleButton"
      >
        <li>
          <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label className="relative inline-flex items-center w-full cursor-pointer">
              <input
                type="checkbox"
                checked={!settings?.showGrids}
                className="sr-only peer"
                onChange={gridHandler}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Show Grids
              </span>
            </label>
          </div>
        </li>
        <li>
          <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label className="relative inline-flex items-center w-full cursor-pointer">
              <input
                type="checkbox"
                checked={!settings?.hideInterface}
                className="sr-only peer"
                onChange={() => {
                  settings?.hideInterface
                    ? setSettings({ ...settings, hideInterface: false })
                    : setSettings({ ...settings, hideInterface: true });
                }}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Hide Interface
              </span>
            </label>
          </div>
        </li>
        <li>
          <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
            <label className="relative inline-flex items-center w-full cursor-pointer">
              <input
                type="checkbox"
                checked={settings?.lazyRadius > 0 ? true : false}
                className="sr-only peer"
                onChange={lazyRadiusClickHandler}
              />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                Lazy Radius
              </span>
            </label>
          </div>
        </li>
        <li>
          <button
            type="button"
            className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MoreDropdown;
