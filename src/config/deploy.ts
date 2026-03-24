/**
 * Konfiguracja wdrożenia (Deploy Configuration)
 * 
 * Ten plik zawiera ustawienia niezbędne do poprawnego działania aplikacji
 * po wdrożeniu na GitHub Pages (lub inne środowiska).
 */

export const deployConfig = {
  // Nazwa repozytorium na GitHubie (np. 'moje-repo')
  // Jeśli publikujesz na domenie głównej (username.github.io), zostaw pusty ciąg znaków: ''
  repoName: 'TestXIV',
  
  // Czy aplikacja jest budowana pod GitHub Pages?
  isGitHubPages: true,
  
  // Obliczona ścieżka bazowa (base path)
  get basePath() {
    return this.isGitHubPages && this.repoName ? `/${this.repoName}/` : '/';
  }
};
