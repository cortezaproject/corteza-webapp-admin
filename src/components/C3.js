import CApplicationEditorInfo from './Application/CApplicationEditorInfo.vue'
import ApplicationEditorInfo from './Application/ApplicationEditorInfo.c3'
import CApplicationEditorUnify from './Application/CApplicationEditorUnify.vue'
import ApplicationEditorUnify from './Application/ApplicationEditorUnify.c3'
import CComposeEditorBasic from './Settings/Compose/CComposeEditorBasic.vue'
import ComposeEditorBasic from './Settings/Compose/ComposeEditorBasic.c3'
import CFederationEditorInfo from './Federation/CFederationEditorInfo.vue'
import FederationEditorInfo from './Federation/FederationEditorInfo.c3'
import CResourceListStatusFilter from './CResourceListStatusFilter.vue'
import ResourceListStatusFilter from './ResourceListStatusFilter.c3'
import EditorTextHtml from './Template/CTemplateEditorContent/EditorTextHtml.vue'
import EditorTextHTML from './Template/CTemplateEditorContent/EditorTextHTML.c3'
import CQueueEditorInfo from './Queues/CQueueEditorInfo.vue'
import QueueEditorInfo from './Queues/QueueEditorInfo.c3'
// import CAuthclientEditorInfo from './Authclient/CAuthclientEditorInfo.vue'
// import AuthClient from './Authclient/AuthClient.c3'
// import CRoleEditorMembers from './Role/CRoleEditorMembers.vue'
// import RoleEditor from './Role/RoleEditor.c3'
// import CPermissionList from './Permissions/CPermissionList.vue'
// import PermissionList from './Permissions/PermissionList.c3'
// import CSessionEditorInfo from './Session/CSessionEditorInfo.vue'
// import SessionEditorInfo from './Session/SessionEditorInfo.c3'
// import CRoleEditorInfo from './Role/CRoleEditorInfo.vue'
// import ExternalOIDC from './Settings/System/Auth/ExternalOIDC.vue'
// import ExternalSAML from './Settings/System/Auth/ExternalSAML.vue'
// import ExternalStd from './Settings/System/Auth/ExternalStd.vue'
// import AuthExternal from './Settings/System/Auth/AuthExternal.c3'
// import CSystemEditorAuth from './Settings/System/CSystemEditorAuth.vue'
// import CSystemEditorExternal from './Settings/System/CSystemEditorExternal.vue'
// import SystemEditorAuth from './Settings/System/SystemEditorAuth.c3'

export default {
  components: [
    // component input (string) + checkboxes
    {
      cmp: CApplicationEditorInfo,
      def: ApplicationEditorInfo,
    },
    // component with textarea
    {
      cmp: CApplicationEditorUnify,
      def: ApplicationEditorUnify,
    },
    // component input (number)
    {
      cmp: CComposeEditorBasic,
      def: ComposeEditorBasic,
    },
    // component with validation
    {
      cmp: CFederationEditorInfo,
      def: FederationEditorInfo,
    },
    // cmpName
    {
      cmp: EditorTextHtml,
      cmpName: 'EditorTextHtml',
      def: EditorTextHTML,
    },
    // cmp with select
    {
      cmp: CQueueEditorInfo,
      def: QueueEditorInfo,
      controls: QueueEditorInfo.controls,
    },
    // component with radio buttons
    {
      cmp: CResourceListStatusFilter,
      def: ResourceListStatusFilter,
    },
    // {
    //   cmp: CRoleEditorMembers,
    //   cmpName: 'CRoleEditorMembers',
    //   def: RoleEditor,
    //   controls: RoleEditor.controls,
    // },
    // component with []/{} if possible :)
    // {
    //   cmp: CAuthclientEditorInfo,
    //   def: AuthClient,
    //   controls: AuthClient.controls,
    // },
    // {
    //   cmp: CPermissionList,
    //   cmpName: 'CPermissionList',
    //   def: PermissionList,
    //   controls: PermissionList.controls,
    // },
    // {
    //   cmp: CSessionEditorInfo,
    //   def: SessionEditorInfo,
    //   controls: SessionEditorInfo.controls,
    // },
    // {
    //   cmp: CRoleEditorInfo,
    //   def: RoleEditor,
    //   controls: RoleEditor.controls,
    // },
    // {
    //   cmp: ExternalOIDC,
    //   def: AuthExternal,
    //   controls: AuthExternal.controls,
    // },
    // {
    //   cmp: ExternalSAML,
    //   def: AuthExternal,
    //   controls: AuthExternal.controls,
    // },
    // {
    //   cmp: ExternalStd,
    //   def: AuthExternal,
    //   controls: AuthExternal.controls,
    // },
    // {
    //   cmp: CSystemEditorAuth,
    //   def: SystemEditorAuth,
    //   controls: SystemEditorAuth.controls,
    // },
    // {
    //   cmp: CSystemEditorExternal,
    //   def: SystemEditorAuth,
    //   controls: SystemEditorAuth.controls,
    // },
  ],
}
