import { useEffect } from 'react';

export function useAutoDownload(trigger: boolean, fileMap: Record<string, string>) {
  useEffect(() => {
    if (!trigger) return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    if (from && fileMap[from]) {
      const link = document.createElement('a');
      link.href = fileMap[from];
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [trigger]);
}
