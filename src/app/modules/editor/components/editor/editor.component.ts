import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { User } from '../../../../shared/models/user.model';
import { SessionService } from '../../../../shared/services/session.service';
import { HttpWrapperService } from '../../../../shared/services/http-wrapper.service';
import { UserFile } from '../../models/user-file';

@Component({
  selector: 'app-code-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public monacoContext: any;
  public monacoInstanceModel: any;

  public editorOptions: any;

  public languagesList: any[];
  public languageSelected: string;

  public userLogged: User;
  public userFileList: UserFile[];
  public userFileSelected: UserFile;

  constructor(
    private sessionService: SessionService,
    private httpWrapper: HttpWrapperService
  ) {
    // These default variables are needed to "hack" around Material Select component,
    // since It won't detect when changing the array provided.
    this.languagesList = [{ id: 'typescript', aliases: ['TypeScript'] }];
    this.languageSelected = 'typescript';

    this.monacoContext = {};

    // User variables initialization / Default content payload
    this.userFileList = [];
    this.userFileSelected = new UserFile();
    this.userFileSelected.content =
      'function x() {\n\tconsole.log("Hello world!");\n}';
    this.userFileList.push(this.userFileSelected);

    // Default editor options
    this.editorOptions = {
      theme: 'vs-dark',
      language: 'typescript',
      autoIndent: true,
      automaticLayout: true
    };
  }

  ngOnInit() {
    // Initialization of User info. It can be either an User object or NULL whether it is logged.
    this.userLogged = this.sessionService.getUser();

    // If user is already logged, his file list is loaded on init.
    if (this.sessionService.isLogged()) {
      this.httpWrapper.getUserEditorFiles().subscribe(fileList => {
        if (fileList) {
          // If retrieved file list isn't empty, userFileList is reassigned.
          this.userFileList = [];
          fileList.forEach(file => {
            this.userFileList.push(file);
          });

          // First file is selected
          this.userFileSelected = this.userFileList[0];
          this.languageSelected = this.userFileSelected.format;
        }
      });
    }

    // Subscription to User info changes. It will update the userLogged instance with every change.
    this.sessionService.userStateEmitter.subscribe(newUserState => {
      // If new state isn't null
      if (newUserState) {
        // Adds the username to the current opened file.
        this.userFileSelected.user = newUserState.username;

        // Gets the user file list.
        this.httpWrapper.getUserEditorFiles().subscribe(fileList => {
          fileList.forEach(file => {
            this.userFileList.push(file);
          });
        });
      }

      this.userLogged = newUserState;
    });
  }

  /**
   * Changes the selected language in the editor.
   * @param newLanguage
   */
  changeEditorLanguage(newLanguage) {
    this.monacoContext.editor.setModelLanguage(
      this.monacoInstanceModel.getModel(),
      newLanguage
    );
    this.languageSelected = newLanguage;
    this.userFileSelected.format = this.languageSelected;
  }

  /**
   * Event hook on editor initialization.
   * @param editor
   */
  onEditorInit(editor: any) {
    // Monaco Manager objects initialization
    this.monacoContext = (<any>window).monaco;
    this.monacoInstanceModel = editor;

    // Initializes the list of languages
    this.languagesList = [];

    // Extracts the list of languages the Monaco Editor contains
    this.monacoContext.languages.getLanguages().forEach(language => {
      this.languagesList.push(language);
    });
  }

  downloadFile() {
    // Get the language of the current file
    const currentLanguage = this.languagesList.find(language => {
      return language.id === this.languageSelected;
    });
    // Extract the format
    const formatFile = currentLanguage.extensions[0];

    // Create Blob
    const blob = new Blob([this.userFileSelected.content], {
      type: 'text/plain;charset=utf-8'
    });

    // If everything went fine, downloads it
    if (formatFile) {
      saveAs(blob, `${this.userFileSelected.fileName}${formatFile}`);
    }
  }

  changeFileSelected(newFileSelected: UserFile) {
    // Sets the language format
    this.monacoContext.editor.setModelLanguage(
      this.monacoInstanceModel.getModel(),
      newFileSelected.format
    );

    // Updates the fileSelected variable
    this.userFileSelected = newFileSelected;

    // Updates the language selected variable
    this.languageSelected = newFileSelected.format;
  }

  createNewFile() {
    const newFile = new UserFile();
    newFile.content = 'function x() {\n\tconsole.log("Hello world!");\n}';
    newFile.user = this.sessionService.getUser().username;
    this.userFileList.push(newFile);
    this.changeFileSelected(newFile);
  }

  saveAllFiles() {
    this.httpWrapper.saveUserFiles(this.userFileList).subscribe(response => {
      this.userFileList = response;
      this.userFileSelected = this.userFileList.find(
        file =>
          file.content === this.userFileSelected.content &&
          file.fileName === this.userFileSelected.fileName
      );
    });
  }

  deleteCurrentFile() {
    this.httpWrapper
      .deleteUserFile(this.userFileSelected)
      .subscribe(response => {
        // If deletion is successful, remove the element from the client array, and select a new one to display.
        this.userFileList = this.userFileList.filter(file => {
          return file !== this.userFileSelected;
        });
        this.userFileSelected = this.userFileList[0];
      });
  }
}
