import { PluginLoader } from "efri/core/plugins/PluginLoader";
import type { IResponseHelper } from "efri/core/types/plugin";

export default PluginLoader.registerPlugin({
  name: "xml-plugin",
  type: "response-helper",
  methods: {
    xml(
      helperContext: IResponseHelper,
      data: string,
      status: number = 200
    ): Response {
      return helperContext
        .writeHead(status, { "Content-Type": "application/xml" })
        .end(data);
    },
  },
});
