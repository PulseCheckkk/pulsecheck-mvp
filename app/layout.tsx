export const metadata = { title: "PulseCheck" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{maxWidth: 720, margin: "2rem auto", fontFamily: "system-ui"}}>
        {children}
      </body>
    </html>
  );
}
