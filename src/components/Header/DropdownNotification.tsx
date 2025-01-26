import { useState } from "react";
import Link from "next/link";
import ClickOutside from "@/components/ClickOutside";
import Image from "next/image";

const notificationList = [
  {
    image: "/images/user/user-15.png",
    title: "Piter Joined the Team!",
    subTitle: "Congratulate him",
  },
  {
    image: "/images/user/user-02.png",
    title: "New message received",
    subTitle: "Devid sent you new message",
  },
  {
    image: "/images/user/user-26.png",
    title: "New Payment received",
    subTitle: "Check your earnings",
  },
  {
    image: "/images/user/user-28.png",
    title: "Jolly completed tasks",
    subTitle: "Assign her new tasks",
  },
  {
    image: "/images/user/user-27.png",
    title: "Roman Joined the Team!",
    subTitle: "Congratulate him",
  },
];

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative hidden sm:block">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          href="#"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sky-900 hover:bg-sky-100 dark:border-sky-900/30 dark:bg-sky-900/10 dark:text-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200"
        >
          <span className="relative">
            <svg
              className="fill-current text-sky-600 dark:text-sky-300 transition-colors duration-200"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0001 1.0415C6.43321 1.0415 3.54172 3.933 3.54172 7.49984V8.08659C3.54172 8.66736 3.36981 9.23513 3.04766 9.71836L2.09049 11.1541C0.979577 12.8205 1.82767 15.0855 3.75983 15.6125C4.3895 15.7842 5.0245 15.9294 5.66317 16.0482L5.66475 16.0525C6.30558 17.7624 8.01834 18.9582 10 18.9582C11.9817 18.9582 13.6944 17.7624 14.3352 16.0525L14.3368 16.0483C14.9755 15.9295 15.6106 15.7842 16.2403 15.6125C18.1724 15.0855 19.0205 12.8205 17.9096 11.1541L16.9524 9.71836C16.6303 9.23513 16.4584 8.66736 16.4584 8.08659V7.49984C16.4584 3.933 13.5669 1.0415 10.0001 1.0415ZM12.8137 16.2806C10.9446 16.504 9.05539 16.504 7.18626 16.2806C7.77872 17.1319 8.8092 17.7082 10 17.7082C11.1908 17.7082 12.2213 17.1319 12.8137 16.2806ZM4.79172 7.49984C4.79172 4.62335 7.12357 2.2915 10.0001 2.2915C12.8765 2.2915 15.2084 4.62335 15.2084 7.49984V8.08659C15.2084 8.91414 15.4533 9.72317 15.9124 10.4117L16.8696 11.8475C17.5072 12.804 17.0204 14.104 15.9114 14.4065C12.0412 15.462 7.95893 15.462 4.08872 14.4065C2.9797 14.104 2.49291 12.804 3.13055 11.8475L4.08772 10.4117C4.54676 9.72317 4.79172 8.91414 4.79172 8.08659V7.49984Z"
                fill="currentColor"
              />
            </svg>

            {notifying && (
              <span className="absolute -top-0.5 right-0 z-1 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse"></span>
            )}
          </span>
        </Link>

        {dropdownOpen && (
          <div className="absolute -right-27 mt-3.5 flex h-[550px] w-75 flex-col rounded-xl border border-sky-100 bg-white shadow-lg dark:border-sky-900/30 dark:bg-sky-900/10 sm:right-0 sm:w-[364px] transition-all duration-300">
            <div className="mb-5 flex items-center justify-between px-5.5 pt-5">
              <h5 className="text-lg font-medium text-sky-900 dark:text-sky-50">
                Notifications
              </h5>
              <span className="rounded-md bg-sky-500 px-2 py-0.5 text-body-xs font-medium text-white">
                5 new
              </span>
            </div>

            <ul className="no-scrollbar mb-5 flex h-auto flex-col gap-1 overflow-y-auto px-5.5">
              {notificationList.map((item, index) => (
                <li key={index}>
                  <Link
                    className="flex items-center gap-4 rounded-[10px] p-2.5 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200"
                    href="#"
                  >
                    <span className="block h-14 w-14 rounded-full overflow-hidden">
                      <Image
                        width={112}
                        height={112}
                        src={item.image}
                        style={{
                          width: "auto",
                          height: "auto",
                        }}
                        alt="User"
                        className="object-cover"
                      />
                    </span>

                    <span className="block">
                      <span className="block font-medium text-sky-900 dark:text-sky-50">
                        {item.title}
                      </span>
                      <span className="block text-body-sm font-medium text-sky-600 dark:text-sky-300">
                        {item.subTitle}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              className="mx-5.5 mb-5 flex items-center justify-center rounded-[7px] border border-sky-500 p-2.5 font-medium text-sky-600 hover:bg-sky-50 dark:border-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/10 transition-colors duration-200"
              href="#"
            >
              See all notifications
            </Link>
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;