import CApplicationEditorInfo from './Application/CApplicationEditorInfo.vue'
import CApplicationEditorUnify from './Application/CApplicationEditorUnify.vue'
import ApplicationDefinitions from './Application/Application.c3'
import CAuthclientEditorInfo from './Authclient/CAuthclientEditorInfo'
import AuthClient from './Authclient/AuthClient.c3'
import CFederationEditorInfo from './Federation/CFederationEditorInfo.vue'
import Federation from './Federation/FederationEditorInfo.c3'
import CPermissionList from './Permissions/CPermissionList.vue'
import PermissionList from './Permissions/PermissionList.c3'
import CQueueEditorInfo from './Queues/CQueueEditorInfo.vue'
import QueueEditorInfo from './Queues/QueueEditorInfo.c3'
import CRoleEditorInfo from './Role/CRoleEditorInfo.vue'
import CRoleEditorMembers from './Role/CRoleEditorMembers.vue'
import RoleEditor from './Role/RoleEditor.c3'
import CSessionEditorInfo from './Session/CSessionEditorInfo.vue'
import SessionEditorInfo from './Session/SessionEditorInfo.c3'
import CComposeEditorBasic from './Settings/Compose/CComposeEditorBasic.vue'
import ComposeEditorBasic from './Settings/Compose/ComposeEditorBasic.c3'
import ExternalOIDC from './Settings/System/Auth/ExternalOIDC.vue'
import ExternalSAML from './Settings/System/Auth/ExternalSAML.vue'
import ExternalStd from './Settings/System/Auth/ExternalStd.vue'
import AuthExternal from './Settings/System/Auth/AuthExternal.c3'
import CSystemEditorAuth from './Settings/System/CSystemEditorAuth.vue'
import CSystemEditorExternal from './Settings/System/CSystemEditorExternal.vue'
import SystemEditorAuth from './Settings/System/SystemEditorAuth.c3'
import EditorTextHtml from './Template/CTemplateEditorContent/EditorTextHtml.vue'
import EditorTextHTML from './Template/CTemplateEditorContent/EditorTextHTML.c3'

export default {
  components: [
    {
      cmp: CApplicationEditorInfo,
      def: ApplicationDefinitions,
      controls: ApplicationDefinitions.controls[0],
    },
    {
      cmp: CApplicationEditorUnify,
      def: ApplicationDefinitions,
      controls: ApplicationDefinitions.controls[1],
    },
    {
      cmp: CAuthclientEditorInfo,
      def: AuthClient,
      controls: AuthClient.controls,
    },
    {
      cmp: CFederationEditorInfo,
      def: Federation,
      controls: Federation.controls,
    },
    {
      cmp: CPermissionList,
      cmpName: 'CPermissionList',
      def: PermissionList,
      controls: PermissionList.controls,
    },
    {
      cmp: CQueueEditorInfo,
      def: QueueEditorInfo,
      controls: QueueEditorInfo.controls,
    },
    {
      cmp: CRoleEditorInfo,
      def: RoleEditor,
      controls: RoleEditor.controls,
    },
    {
      cmp: CRoleEditorMembers,
      cmpName: 'CRoleEditorMembers',
      def: RoleEditor,
      controls: RoleEditor.controls,
    },
    {
      cmp: CSessionEditorInfo,
      def: SessionEditorInfo,
      controls: SessionEditorInfo.controls,
    },
    {
      cmp: CComposeEditorBasic,
      def: ComposeEditorBasic,
      controls: ComposeEditorBasic.controls,
    },
    {
      cmp: ExternalOIDC,
      def: AuthExternal,
      controls: AuthExternal.controls,
    },
    {
      cmp: ExternalSAML,
      def: AuthExternal,
      controls: AuthExternal.controls,
    },
    {
      cmp: ExternalStd,
      def: AuthExternal,
      controls: AuthExternal.controls,
    },
    {
      cmp: CSystemEditorAuth,
      def: SystemEditorAuth,
      controls: SystemEditorAuth.controls,
    },
    {
      cmp: CSystemEditorExternal,
      def: SystemEditorAuth,
      controls: SystemEditorAuth.controls,
    },
    {
      cmp: EditorTextHtml,
      def: EditorTextHTML,
      controls: EditorTextHTML.controls,
    },
  ],
}
