import React, { useState, useMemo, useEffect } from 'react';
import './FileExplorer.css';

/**
 * TypeScript Interfaces
 */
interface CodeFile {
  _id: string;
  fileName: string;
  folderPath: string;
  programmingLanguage: string;
  codeContent: string;
  createdAt: string;
  [key: string]: any;
}

interface FolderGroup {
  [folderPath: string]: CodeFile[];
}

interface FileExplorerProps {
  files: CodeFile[];
  onSelectFile: (file: CodeFile) => void;
  selectedFileId: string | null;
}

/**
 * Group files by folderPath using reduce()
 * Handles edge cases: empty folderPath → "root", trim whitespace, prevent duplicates
 */
const groupFilesByFolder = (files: CodeFile[]): FolderGroup => {
  return files.reduce((groups: FolderGroup, file: CodeFile) => {
    // Normalize folderPath: trim and handle empty values
    const normalizedPath = (file.folderPath || '').trim();
    const folderKey = normalizedPath || 'root';

    // Initialize group if it doesn't exist
    if (!groups[folderKey]) {
      groups[folderKey] = [];
    }

    // Prevent duplicates by checking if file already exists
    const isDuplicate = groups[folderKey].some(f => f._id === file._id);
    if (!isDuplicate) {
      groups[folderKey].push(file);
    }

    return groups;
  }, {});
};

/**
 * Get language-specific icon
 */
const getLanguageIcon = (language: string): string => {
  const iconMap: Record<string, string> = {
    javascript: '✌️',
    typescript: '📘',
    python: '🐍',
    java: '☕',
    cpp: '⚙️',
    csharp: '🔷',
    php: '🐘',
    ruby: '💎',
    go: '🐹',
    rust: '🦀',
    html: '🌐',
    css: '🎨',
    json: '📋',
    markdown: '📝',
    xml: '📑',
    yaml: '⚙️',
    bash: '🖥️',
    sql: '🗄️',
    dockerfile: '📦'
  };
  return iconMap[language?.toLowerCase()] ?? '📄';
};

/**
 * FolderHeader Component
 * Displays folder name with expand/collapse toggle
 */
interface FolderHeaderProps {
  name: string;
  isExpanded: boolean;
  fileCount: number;
  onToggle: () => void;
}

const FolderHeader: React.FC<FolderHeaderProps> = ({
  name,
  isExpanded,
  fileCount,
  onToggle
}) => {
  return (
    <div className="folder-header" onClick={onToggle}>
      <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>{isExpanded ? '▼' : '▶'}</span>
      <span className="folder-icon">📁</span>
      <span className="folder-label">{name}</span>
      <span className="file-count-badge">{fileCount}</span>
    </div>
  );
};

/**
 * FileItem Component
 * Individual file entry in tree
 */
interface FileItemProps {
  file: CodeFile;
  isSelected: boolean;
  onSelect: (file: CodeFile) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, isSelected, onSelect }) => {
  return (
    <div
      className={`file-item ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(file)}
      title={file.fileName}
    >
      <span className="icon">{getLanguageIcon(file.programmingLanguage)}</span>
      <span className="name">{file.fileName}</span>
      <span className="language-badge">{file.programmingLanguage}</span>
    </div>
  );
};

/**
 * Main FileExplorer Component
 * VS Code-style tree explorer with proper folder grouping
 */
const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onSelectFile,
  selectedFileId
}) => {
  // State for managing expanded folders
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Group files by folderPath
  const groupedFiles: FolderGroup = useMemo(() => {
    const grouped = groupFilesByFolder(files);
    return grouped;
  }, [files]);

  // Sort folder keys: root first, then alphabetical
  const sortedFolders: string[] = useMemo(() => {
    const folders = Object.keys(groupedFiles);
    return folders.sort((a, b) => {
      if (a === 'root') return -1;
      if (b === 'root') return 1;
      return a.localeCompare(b);
    });
  }, [groupedFiles]);

  // Sort files within each folder: alphabetical
  const sortedFilesInFolder = (folderPath: string): CodeFile[] => {
    return [...(groupedFiles[folderPath] || [])].sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
  };

  // Toggle folder expansion
  const toggleFolder = (folderPath: string): void => {
    setExpandedFolders(prev => {
      const next = new Set<string>(prev);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  };

  // Auto-expand first folder on initial load
  useEffect(() => {
    if (expandedFolders.size === 0 && sortedFolders.length > 0) {
      const updatedFolders = new Set();
      updatedFolders.add(sortedFolders[0]);
      setExpandedFolders(updatedFolders);
    }
  }, [sortedFolders]);

  return (
    <div className="file-explorer">
      {/* Header */}
      <div className="explorer-header">
        <h3>📂 File Explorer</h3>
        <span className="file-counter">{files.length} files</span>
      </div>

      {/* Content */}
      <div className="explorer-content">
        {files.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h4>No Files</h4>
            <p>Upload a folder to get started</p>
          </div>
        ) : (
          <div className="folders-list">
            {sortedFolders.map(folderPath => {
              const isExpanded = expandedFolders.has(folderPath);
              const filesInFolder = sortedFilesInFolder(folderPath);

              return (
                <div key={folderPath} className="folder-section">
                  <FolderHeader
                    name={folderPath === 'root' ? '📦 root' : folderPath}
                    isExpanded={isExpanded}
                    fileCount={filesInFolder.length}
                    onToggle={() => toggleFolder(folderPath)}
                  />

                  {isExpanded && (
                    <div className="files-list">
                      {filesInFolder.map(file => (
                        <FileItem
                          key={file._id}
                          file={file}
                          isSelected={selectedFileId === file._id}
                          onSelect={onSelectFile}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(FileExplorer);
