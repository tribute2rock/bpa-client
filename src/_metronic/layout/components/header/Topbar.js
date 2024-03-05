import React, { useMemo } from 'react';
import objectPath from 'object-path';
import { useHtmlClassService } from '../../_core/MetronicLayout';
import { UserNotificationsDropdown } from '../extras/dropdowns/UserNotificationsDropdown';
import UserProfileDropdown from '../extras/dropdowns/UserProfileDropdown';

const Topbar = () => {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      viewNotificationsDisplay: objectPath.get(uiService.config, 'extras.notifications.display'),
      viewUserDisplay: objectPath.get(uiService.config, 'extras.user.display')
    };
  }, [uiService]);

  return (
    <div className="topbar">
      {/*{layoutProps.viewNotificationsDisplay && <UserNotificationsDropdown />}*/}
      {layoutProps.viewUserDisplay && <UserProfileDropdown />}
    </div>
  );
};

export { Topbar };
