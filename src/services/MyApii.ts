// export const fetchAPI = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//       credentials: 'include',
//     });
  
//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.statusText}`);
//     }
//     return response.json();
//   };
  