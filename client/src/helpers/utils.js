import { enUS } from "date-fns/locale";
import { formatDistanceToNowStrict } from "date-fns";
import { CONTRACT_TYPES, TELEWORKING } from "@config/constants";

export function getFormattedDistanceToNow(date) {
  const options = {
    locale: {
      ...enUS,
      formatDistance: (unit, count) => {
        const units = {
          xDays: `${count}d atras`,
          xHours: `${count}h atras`,
          xMinutes: `${count}mins atras`,
          xMonths: `${count}mo atras`,
          xSeconds: `${count} secs atras`,
          xYears: `${count}y atras`,
        };
        return units[unit] || "%dh atras";
      },
    },
  };

  return formatDistanceToNowStrict(new Date(date), options);
}

export function isNotDef(v) {
  if (typeof v === "string" && v.trim().length === 0) return true;
  
  return v === undefined || v === null;
}

function getResourceType(resources, id) {
  if (isNotDef(id)) return;

  const type = resources.find((resource) => resource.id === id);
  return type.value;
}

export function getContractType(id) {
  const type = getResourceType(CONTRACT_TYPES, id);
  return type;
}

export function getTeleworkingType(id) {
  const type = getResourceType(TELEWORKING, id);
  return type;
}

export function getShortText(text, maxLength = 230) {
  const isLongText = text.length > maxLength;
  const shortText = isLongText ? text.substring(0, maxLength) + "..." : text;
  return shortText;
}

export function getError(
  error = {},
  defaultError = "Ocurrió un error, intente más tarde."
) {
  const { message, response } = error;
  if (response?.data?.message) {
    return response?.data?.message?.toString();
  }

  if (response?.statusText) {
    return response?.statusText;
  }

  return message || defaultError;
}